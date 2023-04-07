import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ZoomerComponent } from '../zoomer/zoomer.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ZoomerComponent, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
