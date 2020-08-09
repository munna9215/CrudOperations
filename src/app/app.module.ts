import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegisterService } from './user-register.service';
import { HttpClientModule } from '@angular/common/http';
import { UserGridComponent } from './user-grid/user-grid.component';
import { OnlynumbersDirective } from './onlynumbers.directive';
import { UserTitlePipe } from './user-title.pipe';




@NgModule({
  declarations: [
    AppComponent,
    UserGridComponent,
    OnlynumbersDirective,
    UserTitlePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [UserRegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
