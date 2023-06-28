import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  post: FormGroup;
  url: any;
  posts:any;

  constructor(
    private storage: StorageService,
    private router: Router,
    private  alertCtrl :AlertController,
  ) {

    this.post=new FormGroup ({

      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),

    });
  }


  onSubmit(value: any) {
    value.image = this.url;
    console.log(value);
    this.storage.getFromStorage('Postusers').then((savedpost: any) => {
      console.log("Postusers")
      if (savedpost != null) {
        savedpost.push(value);
        this.storage.setIntoStorage('Postusers', savedpost);
      } else {
        savedpost = [value]; 
        this.storage.setIntoStorage('Postusers', savedpost);
      }

      this.router.navigate(['/viewpost']);
    });
    
  }
  
  
  openImageInput() {
    const input = document.createElement('input');
    input.type = 'file';
    input.addEventListener('change', (event: any) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.url = reader.result as string;

      };
      reader.readAsDataURL(file);
    });
    input.click();

  }

  async removeImage() {
    const alert = await this.alertCtrl.create({
      header: 'Alert!',
      message: "Are you sure want to delete this user?",
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            this.alertCtrl.dismiss();
          },
        },
        {
          text: 'Okay',
          handler: () => {
            // this.userlist.splice(index, 1);
            console.log(this.posts);
            this.storage.setIntoStorage("Postusers", this.posts)
          },
        },
      ],
    });
    await alert.present();
    // Perform any other necessary cleanup or actions
  }
}


