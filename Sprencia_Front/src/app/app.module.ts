// Libraries
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './component/home/home.component';
import { ActivitiesListComponent } from './component/home/activities-list/activities-list.component';
import { OpinionsListComponent } from './component/home/opinions-list/opinions-list.component';
import { FooterComponent } from './component/home/footer/footer.component';
import { ActivitiesComponent } from './component/activities/activities.component';
import { CardComponent } from './component/activities/card/card.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { RegisterComponent } from './component/register/register.component';
import { ForgetPasswordComponent } from './component/login/forget-password/forget-password.component';
import { ResetPasswordComponent } from './component/login/reset-password/reset-password.component';
import { CardViewComponent } from './component/card-view/card-view.component';
import { OpinionsComponent } from './component/opinions/opinions.component';
import { ContactoComponent } from './component/contacto/contacto.component';
import { ProfileComponent } from './component/profile/profile.component';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { CreateAdminComponent } from './component/create-admin/create-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ActivitiesComponent,
    HeaderComponent,
    ActivitiesListComponent,
    OpinionsListComponent,
    FooterComponent,
    DashboardComponent,
    CardComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    CardViewComponent,
    OpinionsComponent,
    ContactoComponent,
    ProfileComponent,
    CreateAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxScrollTopModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }

  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
