import { PartialType } from '@nestjs/mapped-types';
import { CompanyDto } from './create-company.dto';

export class UpdateCompanyDto extends PartialType(CompanyDto) {}
