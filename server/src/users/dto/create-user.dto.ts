import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class Coordinates {
  @IsNotEmpty()
  @IsString()
  latitude: string;

  @IsNotEmpty()
  @IsString()
  longitude: string;
}

class Location {
  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @ValidateNested()
  @Type(() => Coordinates)
  coordinates: Coordinates;
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ValidateNested()
  @Type(() => Location)
  location: Location;

  @IsNotEmpty()
  @IsUrl()
  picture: string;
}
