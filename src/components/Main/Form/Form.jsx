import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { storage, ref, uploadBytes, getDownloadURL } from '../../../firebase';
import axios from 'axios';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';



const Form = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState(null);
  const URL = /*import.meta.env.VITE_API_URL ||*/ 'http://localhost:3000';


  //Función que establece si el candidato cumple con los criterios mínimos de admisión
  //De ser así, lo guarda en la base de datos (incluida la URL de su currículum); si no, le envía un email de rechazo
  const checkSubmission = async (data) => {
    if (data.carrera === "Educación Primaria" && data.nota_media >= 7 && (data.nivel_ingles === "C1" || data.nivel_ingles === "C2")) {
      try {
        if (!file) {
          setConfirmationMessage('Por favor, selecciona un archivo PDF.');
          return;
        }

        const cvURL = await uploadFile(file);
        const payload = { ...data, cv: cvURL };
        const response = await axios.post(`${URL}/api/candidatos`, payload);
        console.log(response);
      } catch (error) {
        console.log(error)
        if (error.response && error.response.data.message) {
          setConfirmationMessage(`Error: ${error.response.data.message}`);
        } else {
          setConfirmationMessage('Error al registrar la candidatura. Inténtelo de nuevo.');
        }
      }

    } else if (data.carrera !== "Educación Primaria" && data.nota_media >= 6 && (data.nivel_ingles === "B2" || data.nivel_ingles === "C1" || data.nivel_ingles === "C2")) {
      try {
        if (!file) {
          setConfirmationMessage('Por favor, selecciona un archivo PDF.');
          return;
        }

        const filePath = await uploadFile(file);
        const payload = { ...data, cv: filePath };
        const response = await axios.post(`${URL}/api/candidatos`, payload);
        console.log(response);
      } catch (error) {
        console.log(error)
        if (error.response && error.response.data.message) {
          setConfirmationMessage(`Error: ${error.response.data.message}`);
        } else {
          setConfirmationMessage('Error al registrar la candidatura. Inténtelo de nuevo.');
        }
      }
    } else {
      handleRejection(data);
    }
  };

  //Funiciones para gestionar la carga del archivo PDF del CV
  //La primera recoge el archivo del formulario y la segunda lo sube a Firebase Storage
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('Solo se permiten archivos PDF.');
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB
        setError('El archivo debe ser menor de 5 MB.');
        return;
      }
      setFile(selectedFile);
    }
  };

  const uploadFile = async (file) => {
    if (!file) return null;

    const timestamp = new Date().getTime();
    console.log(timestamp)
    const uniqueFileName = `${timestamp}_${file.name}`;
    const fileRef = ref(storage, `curriculums/${uniqueFileName}`);

    try {
      await uploadBytes(fileRef, file);
      console.log('Archivo subido con éxito');
      const downloadURL = await getDownloadURL(fileRef);
      console.log(downloadURL)
      return downloadURL;
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      throw error;
    }
  };

  //Función que gestiona qué ocurre cuando la solicitud no cumple con los requisitos mínimos
  const handleRejection = async (data) => {
    setTimeout(async () => {
      await sendRejectionEmail(data);
    }, 2000);
  };

  //86400000  - 24horas (sería la configuración definitiva para evitar que el candidato lo perciba como una respuesta automática)

  //Función que gestiona el envío del email de rechazo de la solicitud
  const sendRejectionEmail = async (data) => {
    const { nombre_candidato, email_candidato } = data;
    try {
      await axios.post(`${URL}/api/mailing/candidatos`, { email_candidato, subject: 'Solicitud Programa Empieza por Educar', nombre_candidato });
      console.log('Correo de rechazo enviado');
    } catch (error) {
      console.error('Error al enviar el correo de rechazo:', error);
    }
  };

  //Función que gestiona el submit del formulario
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const edad = parseInt(data.edad, 10);
    const nota_media = parseFloat(data.nota_media);
    data.edad = edad;
    data.nota_media = nota_media;
    console.log(data);

    try {
      setTimeout(() => {
        checkSubmission(data);
        setConfirmationMessage('Candidatura registrada correctamente');
      }, 3000);

      setTimeout(() => {
        setIsSubmitting(false);
        setConfirmationMessage('');
        reset();
      }, 5000);

    } catch (error) {
      console.log(error)
      if (error.response && error.response.data.message) {
        setConfirmationMessage(`Error: ${error.response.data.message}`);
      } else {
        setConfirmationMessage('Error al registrar la candidatura');
      }
    }
  };

  return (
    <>
      <section className='register-candidato'>
        {confirmationMessage ? (confirmationMessage && (
          <div className="confirmation">
            {confirmationMessage === 'Candidatura registrada correctamente' ? (
              <FaCheckCircle color="green" size={34} />
            ) : (
              <FaExclamationCircle color="red" size={34} />
            )}
            <p>{confirmationMessage}</p>
          </div>
        )) : (<>
          <h3>¡Te estamos esperando!</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register('nombre_candidato', {
              required: 'El nombre es obligatorio', pattern: {
                value: /^[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÄËÏÖÜäëïöüÿÇçÑñ\s'-]+$/i
                , message: 'El nombre solo admite letras'
              }, minLength: { value: 2, message: 'El nombre debe tener más de 2 letras' }, maxLength: { value: 70, message: 'El nombre debe tener menos de 70 caracteres' }
            })} placeholder="Nombre" />
            {errors.nombre_candidato && <p>{errors.nombre_candidato.message}</p>}

            <input type="text" {...register('apellidos_candidato', {
              required: 'El/los apellido/s son obligatorios', pattern: {
                value: /^[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÄËÏÖÜäëïöüÿÇçÑñ\s'-]+$/i
                , message: 'Apellidos solo admite letras'
              }, minLength: { value: 2, message: 'Apellidos/o debe tener más de 3 letras' }, maxLength: { value: 70, message: 'Apellidos/o debe tener menos de 70 caracteres' }
            })} placeholder="Apellido" />
            {errors.apellidos_candidato && <p>{errors.apellidos_candidato.message}</p>}

            <select {...register('sexo', { required: 'Sexo es obligatorio' })}>
              <option value="">--Sexo--</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
              <option value="No binario">No binario</option>
              <option value="Género fluido">Género fluido</option>
              <option value="Queer">Queer</option>
              <option value="Poligénero">Poligénero</option>
              <option value="Agénero">Agénero</option>
              <option value="Bigénero">Bigénero</option>
            </select>
            {errors.sexo && <p>{errors.sexo.message}</p>}

            <input type="email" {...register('email_candidato', { required: 'El email es obligatorio', pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i, message: 'El email introducido no tiene el formato necesario' }, minLength: { value: 6, message: 'El email debe tener más de 6 caracteres' }, maxLength: { value: 100, message: 'El email no puede tener más de 100 caracteres' } })} placeholder="Email" />
            {errors.email_candidato && <p>{errors.email_candidato.message}</p>}

            <input type="text" {...register('telefono_candidato', { required: 'El teléfono es obligatorio', pattern: { value: /^\+?\d{1,4}[-. ]?\d{1,4}[-. ]?\d{1,4}[-. ]?\d{1,9}$|^\+?\d{1,15}$/, message: 'El formato del teléfono no es válido' }, minLength: { value: 9, message: 'El teléfono debe tener, al menos, 9 caracteres' }, maxLength: { value: 20, message: 'El teléfono debe tener, máximo, 20 caracteres' } })} placeholder="Teléfono" />
            {errors.telefono_candidato && <p>{errors.telefono_candidato.message}</p>}

            <input type="number" {...register('edad', { required: 'La edad es obligatoria', min: { value: 19, message: 'Debes ser mayor de 18 años' }, max: { value: 65, message: 'Debes tener menos de 65 años' } })} placeholder="Edad" />
            {errors.edad && <p>{errors.edad.message}</p>}

            <select {...register('carrera', { required: 'Carrera es obligatoria' })}>
              <option value="">--Carrera--</option>
              <option value="Educación Infantil">Educación Infantil</option>
              <option value="Educación Primaria">Educación Primaria</option>
              <option value="Pedagogía">Pedagogía</option>
              <option value="Educación Social">Educación Social</option>
              <option value="Psicopedagogía">Psicopedagogía</option>
              <option value="Filología">Filología</option>
              <option value="Educación Física">Educación Física</option>
              <option value="Derecho">Derecho</option>
              <option value="Medicina">Medicina</option>
              <option value="Informática">Informática</option>
              <option value="Psicología">Psicología</option>
              <option value="Economía">Economía</option>
              <option value="ADE">ADE</option>
              <option value="Biología">Biología</option>
              <option value="Enfermería">Enfermería</option>
              <option value="Arquitectura">Arquitectura</option>
              <option value="Periodismo">Periodismo</option>
              <option value="Matemáticas">Matemáticas</option>
              <option value="Filosofía">Filosofía</option>
              <option value="Sociología">Sociología</option>
              <option value="Química">Química</option>
              <option value="Física">Física</option>
              <option value="Otra">Otra</option>
            </select>
            {errors.carrera && <p>{errors.carrera.message}</p>}

            <input type="number" step="0.1" min="0" max="10"{...register('nota_media', {
              required: 'La nota media es obligatoria', pattern: {
                value: /^(10(\.0)?|[0-9](\.[0-9])?)$/, message: 'La nota media debe ser un número decimal entre 0 y 10'
              }
            })} placeholder="Nota media de la carrera" />
            {errors.nota_media && <p>{errors.nota_media.message}</p>}

            <select {...register('nivel_ingles', { required: 'El nivel de inglés es obligatorio' })}>
              <option value="">--Nivel de inglés--</option>
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
              <option value="C1">C1</option>
              <option value="C2">C2</option>
            </select>
            {errors.nivel_ingles && <p>{errors.nivel_ingles.message}</p>}

            <input type="file" accept=".pdf" onChange={handleFileChange} required />
            {errors.curriculum && <p>{errors.curriculum.message}</p>}

            <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Registrando...' : 'Registrar candidatura'}</button>
          </form>
        </>)}
      </section>
    </>
  );
};

export default Form;
