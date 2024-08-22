import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { TableComponent } from './components/table/table.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HomeComponent } from './layout/home/home.component';
import { SuccessComponent } from './services/dialog/success/success.component';


// material
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule} from '@angular/material/icon';
import { MatInputModule} from '@angular/material/input';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatButtonModule} from '@angular/material/button';
import { MatTableModule} from '@angular/material/table';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatSelectModule} from '@angular/material/select';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatDialogModule} from '@angular/material/dialog';
import { MatCardModule} from '@angular/material/card'; 
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from '@angular/cdk/dialog';




@NgModule({
  declarations: [LoaderComponent,TableComponent,HeaderComponent,SidebarComponent,HomeComponent, SuccessComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatExpansionModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,



    
  ],
  exports:[
    CommonModule,
    MatExpansionModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,

    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    DialogModule,

    LoaderComponent,
    TableComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    SuccessComponent
    
  ],
  providers: [  
    MatDatepickerModule,
    MatNativeDateModule  
  ],
})
export class SharedModule { }
