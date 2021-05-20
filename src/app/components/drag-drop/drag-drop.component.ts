import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import {DragdropService} from '../../service/dragdrop.service';


@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})

export class DragDropComponent implements OnInit {

  constructor(
    public fb: FormBuilder,
    private sanitizer: DomSanitizer,
    public dragdropService: DragdropService
  ) {
    this.form = this.fb.group({
      avatar: [null]
    });
  }

  fileArr = [];
  imgArr = [];
  fileObj = [];
  form: FormGroup;
  msg: string;
  progress = 0;
  imageUploaded: boolean;
  imageUrl: string;
  @Output() newImageUrl = new EventEmitter<string>();

  ngOnInit(): void {
    this.imageUploaded = false;
  }
  addImageUrl(value: string): any {
    this.newImageUrl.emit(value);
  }
  upload(e): void {
    const fileListAsArray = Array.from(e);
    fileListAsArray.forEach((item, i) => {
      const file = (e as HTMLInputElement);
      const url = URL.createObjectURL(file[i]);
      this.imgArr.push(url);
      this.fileArr.push({ item, url });
    });

    this.fileArr.forEach((item) => {
      this.fileObj.push(item.item);
    });

    // Set files form control
    this.form.patchValue({
      avatar: this.fileObj
    });

    this.form.get('avatar').updateValueAndValidity();

    // Upload to server
    this.dragdropService.addFiles(this.form.value.avatar)
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded / event.total * 100);
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            console.log('File uploaded successfully!', event.body.photoCreated.avatar[0]);
            this.imageUploaded = true;
            this.imageUrl =  event.body.photoCreated.avatar[0];
            this.addImageUrl(event.body.photoCreated.avatar[0]);
            setTimeout(() => {
              this.progress = 0;
              this.fileArr = [];
              this.fileObj = [];
              this.msg = 'File uploaded successfully!';
            }, 3000);
        }
      });
  }

  // Clean Url for showing image preview
  sanitize(url: string): any {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
