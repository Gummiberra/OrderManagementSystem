import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Organization } from 'src/app/models/organization';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.css']
})
export class OrganizationListComponent implements OnInit {

  organizations: Organization[] = [];
  orgToEdit?: Organization;

  constructor(private organizationService: OrganizationService, private router: Router) { }

  ngOnInit(): void {
    this.organizationService.getOrganizations().subscribe((result: Organization[]) => (this.organizations = result));
  }

 

  updateOrganizationList(organizations: Organization[])
  {
    this.organizations = organizations;
  }

  initNewOrganization()
  {
    this.router.navigate(['organization']);
  }

  editOrganization(org: Organization)
  {
    this.router.navigate(['organization' , org.id]);
  }

}



