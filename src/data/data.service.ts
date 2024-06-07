import { Injectable } from '@nestjs/common';

@Injectable()
export class DataService {
  // Aquí puedes inyectar tu repositorio para guardar los datos en la base de datos
  public create(createDataDto: { data: string }) {
    // Lógica para guardar los datos en la base de datos
    return { message: 'Data loaded successfully', data: createDataDto.data };
  }
}