import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  currentDate = new Date();
  portalName = 'Community Help Desk Portal';
  features = [
    'Real-time service ticket tracking',
    'Advanced search and filtering',
    'User-friendly interface',
    'Responsive design for all devices'
  ];
}
