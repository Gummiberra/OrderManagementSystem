import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faEnvelope, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { Organization } from 'src/app/models/organization';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-edit-organization',
  templateUrl: './edit-organization.component.html',
  styleUrls: ['./edit-organization.component.css']
})
export class EditOrganizationComponent implements OnInit {
  organization?: Organization
  private sub: any;
  organizationForm!: FormGroup;
  formName = "";
  userIcon = faUser;
  phoneIcon = faPhone;
  emailIcon = faEnvelope;
  id = "";

  constructor(private organizationService: OrganizationService, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {   
    this.organizationForm = this.formBuilder.group({
      name: ['', Validators.required],
      adress: [''],
      organizationId: [''],
      id: [null]

    });

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; 
    });

    if(this.id != undefined)
    {
      this.organizationService.getOrganization(this.id).subscribe((result: Organization) => (this.organizationForm.patchValue({
        name: result.name,
        adress: result.adress,
        organizationId: result.organizationId,
        id: result.id
      })));
      this.formName = "Edit organization";
    }
    else
    {
      this.organization = new Organization();
      this.formName = "New organization"
    }

  }

  updateOrganization()
  {
    this.organizationService
      .updateOrganization(this.organizationForm.value)
      .subscribe((organizations: Organization[]) => {
        this.router.navigate(['organizations']);
      });
    
  }

  deleteOrganization()
  {
    this.organizationService
      .deleteOrganization(this.organizationForm.value)
      .subscribe((organizations: Organization[]) => this.router.navigate(['organizations']));
  }

  createOrganization()
  {

    console.log(this.organizationForm.value);
    this.organizationService
      .createOrganization(this.organizationForm.value)
      .subscribe((organizations: Organization[]) => this.router.navigate(['organizations']));
  }
}

