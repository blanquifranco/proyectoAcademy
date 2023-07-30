import pool from  '../database/keys.js';
//La idea es que en este archivo este todo lo que puede hacer cuando el rol es "Mentor"
const mentor = {};

//son funciones con flechas(forma cheta para mi), se podria declarar de las otras formas tambien
mentor.readParticipantes = async (req, res) =>{ //para consultar por todos los participantes

    try {
        const participantes = await (await pool.query('SELECT * FROM participantes')).rows;
        res.status(200).json({participantes});
        
    } catch (error) {
        res.status(500).json({
            message: 'Hubo un error ',
            error
        })
        
    }

};

mentor.readParticipante = async (req, res) =>{ //para consultar por un id especifico de participante
    const id = req.params.id_p;

    try {
        const participante = await (await pool.query('SELECT * FROM participantes  WHERE id_participante = $1', [id])).rows[0];
        res.status(200).json({participante});
        
    } catch (error) {
        res.status(500).json({
            message: 'Hubo un error ',
            error
        })
        
    }

};

mentor.marcarAsistencia = async (req, res) => { //por el momento nomas, segun el proyecto por el lado participante se marca asistencia
    const {id_participante, estado_asistencia, fecha} = req.body; //creo un objeto y los atributos voy a obtener de req.body
    try{
        await pool.query('INSERT INTO Asistencia (id_participante, estado_asistencia, fecha) VALUES ($1,$2,$3)', [id_participante, estado_asistencia, fecha])
        res.status(200).json({
            message: 'Se agrego correctamente',
            asistencia: {id_participante, estado_asistencia, fecha}
        })
    }catch(error){
        res.status(500).json({
            message: 'Hubo un error ',
            error
        })


    }

};

mentor.readAsistencia = async (req, res) =>{
    try {
        const asistencia = await (await pool.query('SELECT * FROM Asistencia')).rows;
        res.status(200).json({asistencia});
        
    } catch (error) {
        res.status(500).json({
            message: 'Hubo un error ',
            error
        })
        
    }

};

mentor.calificarNivelTecnico = async (req, res) =>{
    const {id_participante, id_mentor, nivel} = req.body; //creo un objeto y los atributos voy a obtener de req.body
    try{
        await pool.query('INSERT INTO nivel_tecnico (id_participante, id_mentor, nivel) VALUES ($1,$2,$3)', [id_participante, id_mentor, nivel])
        res.status(200).json({
            message: 'Se agrego correctamente',
            nivel: {id_participante, id_mentor, nivel}
        })
    }catch(error){
        res.status(500).json({
            message: 'Hubo un error ',
            error
        })


    }

};
mentor.readNivelTecnicoPromedio= async (req, res) =>{ //la idea de este es ver el participante y el promedio de su nivel ya
    try {
        const nivel = await (await pool.query('SELECT apellido, nombre, ROUND(AVG(nivel)) as promedio  FROM Participantes p JOIN Nivel_tecnico n ON p.id_participante = n.id_participante GROUP BY  apellido, nombre ORDER BY  apellido ASC')).rows;
        res.status(200).json({nivel});
        
    } catch (error) {
        res.status(500).json({
            message: 'Hubo un error ',
            error
        })
        
    }

}; 

mentor.readMentores = async(req,res) =>{
    try {
        const mentores = await (await pool.query('SELECT * FROM Mentores')).rows;
        res.status(200).json({mentores});
        
    } catch (error) {
        res.status(500).json({
            message: 'Hubo un error ',
            error
        })
        
    }


};


mentor.readMentor = async (req, res) =>{ //para consultar por un id especifico de mentor
    const id = req.params.id_m;

    try {
        const mentor = await (await pool.query('SELECT * FROM Mentores  WHERE id_mentor = $1', [id])).rows[0];
        res.status(200).json({mentor});
        
    } catch (error) {
        res.status(500).json({
            message: 'Hubo un error ',
            error
        })
        
    }

};

mentor.marcarAlmuerzo = async (req, res) =>{//por el momento nomas tambien
    const {id_participante, estado_almuerzo, fecha, observacion} = req.body; //creo un objeto y los atributos se a obtener de req.body
    try{
        await pool.query('INSERT INTO Almuerzo (id_participante, estado_almuerzo, fecha, observacion) VALUES ($1,$2,$3,$4)', [id_participante, estado_almuerzo, fecha, observacion])
        res.status(200).json({
            message: 'Se agrego correctamente',
            asistencia: {id_participante, estado_almuerzo, fecha, observacion}
        })
    }catch(error){
        res.status(500).json({
            message: 'Hubo un error ',
            error
        })


    }

};

mentor.readAlmuerzo = async (req, res) => {
    try {
        const almuerzo = await (await pool.query('SELECT * FROM Almuerzo')).rows;
        res.status(200).json({almuerzo});
        
    } catch (error) {
        res.status(500).json({
            message: 'Hubo un error ',
            error
        })
        
    }

};

mentor.readAlmuerzoSi = async (req, res) => {
    try {
        const almuerzo = await (await pool.query("SELECT * FROM Almuerzo WHERE estado_almuerzo = 'SI'")).rows;
        res.status(200).json({almuerzo});
        
    } catch (error) {
        res.status(500).json({
            message: 'Hubo un error ',
            error
        })
        
    }

};

mentor.cargarMesa = async(req, res) => {
    const {nombre, cant_sillas} = req.body; //creo un objeto y los atributos se a obtener de req.body
    try{
        await pool.query('INSERT INTO Mesa (nombre, cant_de_sillas) VALUES ($1,$2)', [nombre, cant_sillas])
        res.status(200).json({
            message: 'Se agrego correctamente',
            asistencia: {nombre, cant_sillas}
        })
    }catch(error){
        res.status(500).json({
            message: 'Hubo un error ',
            error
        })


    }
    

}

mentor.readMesa = async(req, res) => {
    try {
        const mesa = await (await pool.query('SELECT * FROM Mesa')).rows;
        res.status(200).json({mesa});
        
    } catch (error) {
        res.status(500).json({
            message: 'Hubo un error ',
            error
        })
        
    }

}



module.exports = mentor;
