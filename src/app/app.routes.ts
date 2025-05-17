import { Routes } from '@angular/router';
import { ChatPage } from '../pages/chat-page/chat-page.component';
import { ChatListPage } from '../pages/page-list/chat-list-page.component';

export const routes: Routes = [
  { path: '', component: ChatListPage },
  { path: 'conversation/:id', component: ChatPage },
];
