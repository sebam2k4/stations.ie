import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme-service/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isDarkTheme: boolean;

  constructor(private themeService: ThemeService) { }

  async ngOnInit(): Promise<void> {
    this.isDarkTheme = this.themeService.isDarkTheme();

    this.themeService.themeChange.subscribe(value => {
      this.isDarkTheme = value;
    });
  }
}
