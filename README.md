# Weather Journal App

This is an asynchronous web app that uses the OpenWeatherMap API and user data to dynamically update the UI with relevant information.

## Run Locally

Clone the project

```bash
  git clone https://github.com/lauraeromerod/weather-journal-app
```

Go to the project directory

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## API Reference

#### Get Project Data

```http
  GET /project
```

#### Post Project Data

```http
  POST /project
```

| Parameter     | Type     | Description                       |
| :------------ | :------- | :-------------------------------- |
| `city`        | `string` | formatted city                    |
| `feel`        | `string` | user feeling                      |
| `date`        | `string` | current date                      |
| `temperature` | `string` | current weather temperature       |
| `icon`        | `string` | weather icon based on temperature |
| `country`     | `string` | country acronym                   |
| `description` | `string` | weather description               |

## Tech Stack

**Client:** Vanilla JS

**Server:** Node, Express

## License

[MIT]

## Authors

- [@lauraeromerod](https://github.com/lauraeromerod)
