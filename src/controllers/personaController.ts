import { Request, Response } from 'express';
import { PersonaService } from '../services/personaServices';
import { pasarADto, pasarAModelo, PersonaDto } from '../dtos/personaDto';
import { ControllerGenerico } from './entityController';
import { Persona } from '../models/persona';

export class PersonaController extends ControllerGenerico<Persona, PersonaService> {
    private personaService: PersonaService;

    constructor(personaService: PersonaService) {
        super(personaService);
        this.personaService = personaService;
    }

  getNombreApellidoById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const persona = await this.service.getById(id);
      if (!persona) {
        res.status(404).json({ mensaje: 'Persona no encontrada' });
      }
      res.status(200).json({
        nombre: persona?.nombre,
        apellido: persona?.apellido
      });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error obteniendo nombre y apellido', error });
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const personaDto = req.body;

      if (!personaDto?.dni || !personaDto?.nombre || !personaDto?.apellido) {
        res.status(400).json({
          mensaje: "Faltan datos obligatorios: nombre, apellido o dni"
        });
        return;
      }
      const personaExistente = await this.personaService.findByDni(personaDto.dni);
      if (personaExistente) {
        res.status(409).json({
          mensaje: `Ya existe una persona registrada con DNI: ${personaDto.dni}`
        });
        return;
      }
      const personaCreada = await this.service.create(pasarAModelo(personaDto));
      res.status(201).json({
        mensaje: 'La persona fue creada exitosamente',
        dato: pasarADto(personaCreada)
      });
    } catch (error) {
      console.error("Error al crear persona:", error);

      if (
        error instanceof Error &&
        (error.name === 'ValidationError' ||
        error.message.toLowerCase().includes('invalid'))
      ) {
        res.status(400).json({
          mensaje: 'Datos inválidos en el body',
          error: error.message
        });
      } else {
        res.status(500).json({
          mensaje: 'Error creando persona',
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const actualizada = await this.service.update(req.params.id, req.body);
      if (!actualizada) {
        res.status(404).json({ mensaje: 'Persona no encontrada para actualizar' });
      } else {
      res.status(200).json({
        mensaje: 'Persona actualizada correctamente',
        dato: pasarADto(actualizada)
      });
    }
    } catch (error) {
      res.status(500).json({ mensaje: 'Error actualizando persona', error });
    }
  };

  browse = async (req: Request, res: Response) => {
    try {
      const personas = await this.service.getAll();
      const resultado = personas.map((p) => ({
        id: p._id,
        nombreCompleto: `${p.nombre} ${p.apellido}`
      }));
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener listado de nombres', error });
    }
  };
}
