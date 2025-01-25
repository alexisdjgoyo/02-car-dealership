import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDTO, UpdateCarDTO } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: uuid(),
      brand: 'Jeep',
      model: 'Cherokee',
    },
  ];

  public findALl() {
    return this.cars;
  }

  public findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) {
      throw new NotFoundException(`Car with id '${id}' not found`);
    }
    return car;
  }

  create(createCarDTO: CreateCarDTO) {
    // create({model,brand},CreateCarDTO) //usando desestructuración, luego solo asignas usando model y brand directamente
    const car: Car = {
      id: uuid(),
      // model: createCarDTO.model,
      // brand: createCarDTO.brand,
      ...createCarDTO, //esparce las propiedades del objeto... desestructuración también
    };

    this.cars.push(car);

    return car;
  }

  update(id: string, updateCarDTO: UpdateCarDTO) {
    let carDB = this.findOneById(id);
    this.cars = this.cars.map((car) => {
      if (car.id == id) {
        carDB = {
          ...carDB,
          ...updateCarDTO,
          id,
        };
        return carDB;
      }
      return car;
    });
    return carDB;
  }

  delete(id: string) {
    this.findOneById(id);
    this.cars = this.cars.filter((car) => car.id !== id);
  }
}
