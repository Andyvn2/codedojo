import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { EditComponent } from './edit/edit.component';
import { NewComponent } from './new/new.component';
import { ReviewComponent } from './review/review.component';
import { WriteComponent } from './write/write.component';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    EditComponent,
    NewComponent,
    ReviewComponent,
    WriteComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule, FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
