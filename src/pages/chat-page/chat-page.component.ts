import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { User, Message, Chat } from '../../interface';
import {
  getChat,
  getMessages,
  getUser,
  postMessage,
} from '../../services/chat.service';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'chat-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './chat-page.component.html',
})
export class ChatPage {
  createCommentForm = new FormGroup({
    content: new FormControl('', [
      Validators.required,
      Validators.maxLength(256),
    ]),
  });

  title = 'chat-page';

  chat: Chat | null = getChat(0);
  messages: Message[] | null = this.chat ? getMessages(this.chat.id) : [];
  employee: User | null = this.chat ? getUser(this.chat.employee_id) : null;
  customer: User | null = this.chat ? getUser(this.chat.customer_id) : null;

  handleSubmit(): void {
    postMessage(
      this.chat?.id as number,
      this.customer?.id as number,
      this.createCommentForm.value.content as string,
      this.messages as Message[]
    );
  }

  isFromEmployee(message: Message): boolean {
    return message.author_id === this.employee?.id;
  }

  getFullName(user: User | null): string {
    if (!user) {
      return '';
    }
    return `${user.first_name} ${user.last_name}`;
  }
}
