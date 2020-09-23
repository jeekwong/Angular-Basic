import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HighlightDirective } from './highlight.directive';
import { ExponentialStrengthPipe } from './exponential-strength.pipe';
import { FlyingHeroesComponent } from './flying-heroes/flying-heroes.component';
import { FlyingHeroesPipe } from './flying-heroes.pipe';
import { HeroAsyncMessageComponent } from './hero-async-message/hero-async-message.component';
import { FetchJsonPipe } from './fetch-json.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective,
    ExponentialStrengthPipe,
    FlyingHeroesComponent,
    FlyingHeroesPipe,
    HeroAsyncMessageComponent,
    FetchJsonPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
