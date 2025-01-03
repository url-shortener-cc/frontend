import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title: string = 'URL Shortener';
  shortUrl: string = '';
  longUrl: string = '';

  constructor(private router: Router) {}

  urlOnChange(url: string) {
    console.log(url);
    this.longUrl = url;
  }

  async getShortUrl() {
    if (this.longUrl.length > 0) {
      const apiUrl = 'http://localhost:8000/api/v1/shortUrl/create';
      try {
        const response = await axios.post<{ data: { shortUrl: string } }>(
          apiUrl,
          { long_url: this.longUrl }
        );
        console.log(response);
        this.shortUrl = response.data.data.shortUrl;
      } catch (error) {
        console.error('Error fetching short URL:', error);
      }
    }
  }

  async getLongUrl() {
    const s = this.shortUrl.split('/s/')[1];
    console.log(this.shortUrl, s);
    const apiUrl = `http://localhost:8000/api/v1/shortUrl/redirect?s=${s}`;
    try {
      const response = await axios.get<{ data: { longUrl: string } }>(apiUrl);
      console.log(response);
      window.open(response.data.data.longUrl, '_blank');
    } catch (error) {
      console.error('Error fetching short URL:', error);
    }
  }
}
