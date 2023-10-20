import { Component, OnInit } from "@angular/core";

import "firebase/firestore";

import { AngularFirestore } from "@angular/fire/firestore";
import { COURSES, findLessonsForCourse } from "./db-data";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent {
  constructor(private db: AngularFirestore) {}

  async uploadData() {
    const coursesCollection = this.db.collection("courses");
    const courses = await this.db.collection("courses").get();
    for (let course of Object.values(COURSES)) {
      const newCourse = this.removeId(course);
      const courseRef = await coursesCollection.add(newCourse);
      const lessons = await courseRef.collection("lessons");
      const courseLessons = findLessonsForCourse(course["id"]);
      console.log(`Uploading course ${course["description"]}`);
      for (const lesson of courseLessons) {
        const newLesson = this.removeId(lesson);
        delete newLesson.courseId;
        await lessons.add(newLesson);
      }
    }
  }

  removeId(data: any) {
    const newData: any = { ...data };
    delete newData.id;
    return newData;
  }

  onReadDoc() {

    //é preciso fazer unsubscribe nos long running observables
    

    this.db
      .doc("/courses/ZroOgezPocWAJFCD1j9X").valueChanges().subscribe(

  (course) => {
        
        console.log(course);
      });




// snapshotChanges retorna tudo incluindo o id
//     this.db
//       .doc("/courses/ZroOgezPocWAJFCD1j9X").snapshotChanges().subscribe(

//   (snap) => {
//         console.log(snap.payload.id);
//         console.log(snap.payload.data());
//       });





    //   .get()
    //   .subscribe((doc) => {
    //     console.log(doc.id);
    //     console.log(doc.data());
    //   });
  }

  onReadCollection() {
    this.db
      .collection("/courses/BMjk2NGvtfzNKmN47tyj/lessons", (ref) =>
        ref.where("seqNo", "<=", 3).orderBy("seqNo")
      )
      .get()
      .subscribe((snaps) => {
        snaps.forEach((snap) => {
          console.log(snap.id);
          console.log(snap.data());
        });
      });
  }

  onReadCollectionGroup() {
    this.db
      .collectionGroup("lessons", (ref) => ref.where("seqNo", "==", 1))
      .get()
      .subscribe((snaps) => {
        snaps.forEach((snap) => {
          console.log(snap.id);
          console.log(snap.data());
        });
      });
  }
}
