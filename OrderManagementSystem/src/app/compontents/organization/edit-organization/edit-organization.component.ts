import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Organization } from 'src/app/models/organization';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-edit-organization',
  templateUrl: './edit-organization.component.html',
  styleUrls: ['./edit-organization.component.css']
})
export class EditOrganizationComponent implements OnInit {
  @Input() organization?: Organization;
  @Output() organizationsUpdated = new EventEmitter<Organization[]>();

  constructor(private organizationService: OrganizationService) { }

  ngOnInit(): void {
  }

  updateOrganization(organization:Organization)
  {
    this.organizationService
      .updateOrganization(organization)
      .subscribe((organizations: Organization[]) => this.organizationsUpdated.emit(organizations));
  }

  deleteOrganization(organization:Organization)
  {
    this.organizationService
      .deleteOrganization(organization)
      .subscribe((organizations: Organization[]) => this.organizationsUpdated.emit(organizations));
  }

  createOrganization(organization:Organization)
  {
    this.organizationService
      .createOrganization(organization)
      .subscribe((organizations: Organization[]) => this.organizationsUpdated.emit(organizations));
  }
}

