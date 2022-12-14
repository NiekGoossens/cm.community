import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subject } from '../../../../subject';
import { SubjectService } from '../../../services/subject/subjectService';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-subject-edit',
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.css']
})
export class SubjectEditComponent {
  constructor(private subjectService: SubjectService, private route: ActivatedRoute, private router: Router,
    private fb: FormBuilder) { }
  // productForm: FormGroup;
  isEdit = true;

  subjectId: string | null = null;
  subject: Subject = {
    id: 0,
    name: '',
    image: '',
    description: ''

  };

  highestId = 0;

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      this.subjectId = this.subjectService.getHighestId().toString() + 1;
      if (this.subjectId != null && this.subjectId <= this.subjectService.getHighestId().toString()) {
        // Bestaande user
        this.subject = this.subjectService.getSubjectById(Number(this.subjectId));

      } else {
        // Nieuwe user
        this.isEdit = false;
        this.subject = new Subject();
        this.subject.id = this.subjectService.getHighestId() + 1;
      }
    });
  }

  onSubmit(userForm: NgForm) {
    if (this.isEdit) {
      this.subjectService.updateSubject(userForm.value)
    } else {
      const newSubject = {
        id: this.subjectService.getSubjects().length,
        ...userForm.value
      };
      this.subjectService.addSubject(newSubject);
    }

    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  delete(id: number) {
    this.subjectService.deleteSubject(1);
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  save() {
    console.log('Hier komt je save actie');
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
