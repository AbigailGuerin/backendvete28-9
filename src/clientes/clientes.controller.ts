import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { AuthGuard } from '../auth/guards/auth/auth.guard'; // <-- Tus guardias
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { Roles } from '../auth/decorators/roles/roles.decorator'; // <-- Tu decorador

@Controller('clientes')
@UseGuards(AuthGuard, RolesGuard) // ¡Nadie entra a ninguna ruta de clientes sin Token válido!
export class ClientesController {
constructor(private readonly clientesService: ClientesService) {}

@Post()
@Roles('admin', 'veterinario') // Solo el personal puede registrar clientes nuevos
create(@Body() createClienteDto: CreateClienteDto) {
return this.clientesService.create(createClienteDto);
}

@Get()
findAll() {
// Cualquier usuario logueado puede ver la lista de clientes
return this.clientesService.findAll();
}

@Get(':id')
findOne(@Param('id') id: string) {
// Cualquier usuario logueado puede ver el detalle de un cliente específico
return this.clientesService.findOne(+id);
}

@Patch(':id')
@Roles('admin', 'veterinario') // Solo el personal puede editar datos de clientes
update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
return this.clientesService.update(+id, updateClienteDto);
}

@Delete(':id')
@Roles('admin') // ¡Máxima seguridad! Solo el dueño/admin puede borrar un cliente del sistema
remove(@Param('id') id: string) {
return this.clientesService.remove(+id);
}
}