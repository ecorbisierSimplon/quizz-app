// role.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async createInitialRoles() {
    const roles = [
      { text: 'Admin', rang: 100 },
      { text: 'Utilisateur', rang: 2 },
      { text: 'Visiteur', rang: 0 },
    ];

    for (const role of roles) {
      const existingRole = await this.roleRepository.findOne({
        where: { text: role.text },
      });

      if (!existingRole) {
        await this.roleRepository.save(this.roleRepository.create(role));
      }
    }
  }

  findAll() {
    return this.roleRepository.find();
  }

  findOneById(id: number) {
    return this.roleRepository.findOne({
      where: { id: id },
    });
  }

  countRole() {
    return this.roleRepository.createQueryBuilder('roles').getCount();
  }
}
