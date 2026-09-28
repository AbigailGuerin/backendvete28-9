import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { MascotasService } from './mascotas.service.js';
import { CreateMascotaDto } from './dto/create-mascota.dto.js';
import { UpdateMascotaDto } from './dto/update-mascota.dto.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from '../auth/guards/auth/auth.guard'; // <-- Importa tu nuevo guardia

@Controller('mascotas')
@UseGuards(AuthGuard) // ¡BUM! A partir de esta línea, TODO este controlador requiere la pulsera VIP
export class MascotasController {
  constructor(private readonly mascotasService: MascotasService) { }
  @Post()
  // 1. ¡Le decimos a Nest que atrape un archivo llamado 'foto'!
  @UseInterceptors(
    FileInterceptor('foto', {

      // 2. Configuramos dónde y cómo se va a guardar en el disco duro
      storage: diskStorage({
        destination: './uploads/mascotas', // Carpetas en la raíz de tu proyecto
        filename: (req, file, callback) => {

          // Generamos un nombre único: "mascota-432423423.png" para que no se sobrescriban
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `mascota-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  create(
    @Body() createMascotaDto: CreateMascotaDto,
    @UploadedFile() file: Express.Multer.File, // <-- ¡Aquí llega el archivo físico guardado!
  ) {
    // Si el usuario subió una foto, le guardamos SOLO el nombre del archivo en el DTO
    if (file) {
      createMascotaDto.foto = file.filename;
    }
    return this.mascotasService.create(createMascotaDto);
  }

  @Get()
  findAll() {
    return this.mascotasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mascotasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMascotaDto: UpdateMascotaDto) {
    return this.mascotasService.update(+id, updateMascotaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mascotasService.remove(+id);
  }
}

