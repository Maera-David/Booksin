import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../models/book.model';
import DataSnapshot = firebase.database.DataSnapshot;
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class BooksService {

  books: Book[] = [];
  bookSubject = new Subject<Book[]>();

  emitBooks() {
    this.bookSubject.next(this.books);
  }

  saveBook() {
    firebase.database().ref('/books').set(this.books);
  }

  getBooks() {
    firebase.database().ref('/books')
      .on('value', (data: DataSnapshot) => {
          this.books = data.val() ? data.val() : [];
          this.emitBooks();
        }
      );
  }

  getSingleBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBook();
    this.emitBooks();
  }

  removeBook(book: Book) {
    if(book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo removed !');
        },
        (error) => {
          console.log('Could not remove photo ! :' + error);
        }
      );
    }

    const bookIndexToRemove = this.books.findIndex(
      (bookE1) => {
        if(bookE1 === book) {
          return true;
        }
      }
    );

    this.books.splice(bookIndexToRemove, 1);
    this.saveBook();
    this.emitBooks();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Loading…');
          },
          (error) => {
            console.log('Loading error ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
}

  constructor() {
    this.getBooks();
   }
}
