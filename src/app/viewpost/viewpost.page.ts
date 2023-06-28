import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { AlertController } from '@ionic/angular';
import { ItemReorderEventDetail } from '@ionic/core';


@Component({
  selector: 'app-viewpost',
  templateUrl: './viewpost.page.html',
  styleUrls: ['./viewpost.page.scss'],
})
export class ViewpostPage implements OnInit {
  posts: any;

  constructor(
    private storage: StorageService,
    private alertCtrl: AlertController,
  ) {}

  ngOnInit() {
    this.loadPosts();
  }

  handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    console.log('Before complete', this.posts);
    const itemMove = this.posts.splice(event.detail.from, 1)[0];
    this.posts.splice(event.detail.to, 0, itemMove);
    event.detail.complete();
    console.log('After complete', this.posts);
    this.storage.setIntoStorage('Postusers', this.posts);
  }
  

  loadPosts() {
    this.storage.getFromStorage('Postusers').then((savedPosts: any) => {
      if (savedPosts != null) {
        this.posts = savedPosts;
        console.log("savedPosts:", savedPosts);
      } else {
        // this.presentAlert('No posts found. Please add a post.');
      }
    });
  }

  async removePost(post: any) {
    const alert = await this.alertCtrl.create({
      header: 'Alert!',
      message: 'Are you sure you want to delete this post?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            alert.dismiss();
          },
        },
        {
          text: 'Okay',
          handler: () => {
            const index = this.posts.indexOf(post);
            this.posts.splice(index, 1);
            this.storage.setIntoStorage('Postusers', this.posts);
          },
        },
      ],
    });
    await alert.present();
  }
}
