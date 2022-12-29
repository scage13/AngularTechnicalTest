import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Components
import { TasksComponent } from './tasks.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import { TaskFiltersComponent } from './components/task-filters/task-filters.component';

// Services
import { TasksService } from './services/tasks.service';

@NgModule({
  declarations: [
    TasksComponent,
    TaskCardComponent,
    TaskDialogComponent,
    TaskFiltersComponent,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  providers: [
    TasksService,
  ]
})
export class TasksModule { }
