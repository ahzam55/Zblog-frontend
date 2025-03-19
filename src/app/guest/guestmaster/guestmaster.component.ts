import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-guestmaster',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './guestmaster.component.html',
  styleUrl: './guestmaster.component.css'
})
export class GuestmasterComponent {

}
