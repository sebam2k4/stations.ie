import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/core/services/theme-service/theme.service';

@Component({
  selector: 'nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})

export class NavHeaderComponent implements OnInit {
  public isDarkTheme: boolean;

  constructor(private themeService: ThemeService) { }

  async ngOnInit(): Promise<void> {
    this.isDarkTheme = this.themeService.isDarkTheme();

    this.themeService.themeChange.subscribe(value => {
      this.isDarkTheme = value;
    });
  }

  public onLightIconClicked(): void {
    if (this.isDarkTheme) {
      this.setDarkThemeState(false);
    }
  }

  public onDarkIconClicked(): void {
    if (!this.isDarkTheme) {
      this.setDarkThemeState(true);
    }
  }

  public setDarkThemeState(state: boolean): void {
    this.themeService.toggleDarkTheme(state);
  }
}
