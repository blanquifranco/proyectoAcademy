import express from 'express';
import mentor from '../controllers/mentor'
const router = express.Router();

router.post('/asistencia', mentor.marcarAsistencia );//el mentor marca la asistencia
router.get('/asistencia', mentor.readAsistencia);

router.get('/participantes', mentor.readParticipantes);//mentor puede ver a todos los partipantes
router.get('/participantes/:id_p', mentor.readParticipante);

router.post('/participantes/nivel', mentor.calificarNivelTecnico);
router.get('/nivel', mentor.readNivelTecnicoPromedio);

router.get('/mentores', mentor.readMentores) //en mi cabeza este podria servir para que todos podamos ver quien califico a quien
router.get('/mentores/:id_m', mentor.readMentor); //un mentor en especifico

router.post('/almuerzo', mentor.marcarAlmuerzo);
router.get('/almuerzo', mentor.readAlmuerzo);
router.get('/almuerzo/si', mentor.readAlmuerzoSi);

router.post('/mesas', mentor.cargarMesa);
router.get('/mesas', mentor.readMesa);

module.exports = router;