import { IsString, Length, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateClienteDto {
    @IsNumber()
    @IsNotEmpty()
    id!: number;

    @IsString({ message: 'El nombre debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @Length(2, 50, { message: 'El nombre debe tener entre 2 y 50 caracteres' })
    nombre!: string;

    @IsString()
    @IsNotEmpty()
    @Length(2, 50)
    apellido!: string;

    @IsString()
    @IsNotEmpty()
    @Length(7, 10, { message: 'El documento debe tener entre 7 y 10 dígitos' })
    documento!: string;

    @IsString()
    @IsNotEmpty()
    @Length(10, 50, { message: 'La direccion debe tener entre 10 y 50 dígitos' })
    direccion!: string;

    @IsString()
    @IsNotEmpty()
    @Length(10, 50, { message: 'La localidad debe tener entre 10 y 50 dígitos' })
    localidad!: string;

    @IsString()
    @IsNotEmpty()
    @Length(7, 15, { message: 'El telefono debe tener entre 7 y 15 dígitos' })
    telefono!: string;

    @IsString()
    @IsNotEmpty()
    @Length(255)
    foto!: string;

    
    @IsString()
    @IsNotEmpty()
    @Length(10, 40, { message: 'El email debe tener entre 10 y 40 dígitos' })
    email!: string;

    @IsNumber()
    @IsNotEmpty()
    usuario_id!: number;
}
