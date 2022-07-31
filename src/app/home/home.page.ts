import { Component } from '@angular/core';
import {
  collection,
  collectionChanges,
  Firestore,
  collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  readonly items$: Observable<FoodItem[]> = collectionData(
    collection(this.firestore, 'foodList'),
    { idField: 'id' }
  ) as Observable<FoodItem[]>;

  readonly items2$: Observable<FoodItem[]> = collectionChanges(
    collection(this.firestore, 'foodList')
  ).pipe(
    map((items) => items.map( (item) => {
      const data = item.doc.data() as FoodItem;
      const id = `prefix-${item.doc.id}`;

      return { id, ...data }
    }))
  );

  constructor(private readonly firestore: Firestore) {}
}

interface FoodItem {
  id: string;
  name: string;
}
