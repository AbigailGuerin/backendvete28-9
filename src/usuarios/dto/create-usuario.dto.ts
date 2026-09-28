import { IsEmail, IsNotEmpty, IsString, Length, IsOptional } from 'class-validator';
export class CreateUsuarioDto {
    @IsEmail({}, { message: 'Por favor, ingresa un correo electrónico válido' })
    @IsNotEmpty({ message: 'El email no puede estar vacío' })
    email!: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 20, { message: 'La contraseña debe tener entre 6 y 20 caracteres' })
    password!: string;
    
    @IsString()
    @IsOptional()
    rol?: string; // Es opcional porque si no lo mandan, MySQL le pone 'cliente' por defecto
}
