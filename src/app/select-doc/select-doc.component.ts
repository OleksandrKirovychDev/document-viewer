import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { IDoc } from '../shared/models/doc.model';
import { DocsService } from '../shared/services/docs.service';

@Component({
  selector: 'app-select-doc',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './select-doc.component.html',
  styleUrls: ['./select-doc.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDocComponent implements OnInit {
  constructor(private docsService: DocsService) {}

  public docs$!: Observable<IDoc[]>;

  ngOnInit(): void {
    this.docs$ = this.docsService.loadDocuments();
  }
}
