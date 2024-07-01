# FoodTruck Finder

FoodTruck Finder is a web application designed to help users find food trucks in San Francisco. The application fetches data from the San Francisco government's open data API, displays it in a user-friendly table, and allows users to view food truck locations on a map.

## Technologies Used

- **Node.js**: Used for building the backend API due to its efficiency and ability to handle I/O operations.
- **Express**: A minimal framework for Node.js, ideal for quickly building APIs.
- **React**: Used for building the user interface due to its flexibility and robustness in creating reusable components.
- **Material-UI**: A React component library that implements Material Design, providing a modern and consistent UI.
- **Tailwind CSS**: Used for custom styling, providing utility classes for quick responsive layout construction.
- **Leaflet**: A JavaScript library for interactive maps, lightweight and easy to use.
- **Docker**: Used for containerizing the application, ensuring it runs in any environment.

## Installation

Follow the steps below to set up and run the application locally:

1. Clone the repository:
    ```sh
    git clone https://github.com/adriano0488/engineering-assessment.git
    cd engineering-assessment
    ```

2. Set up the Docker environment:
    ```sh
    docker-compose up --build
    ```

3. Access the application:
    Open your browser and go to `http://localhost:5000`.

## Troubleshooting

If you encounter any issues during installation, consider the following:

- **Docker not starting**: Ensure Docker Desktop is installed and running. Check Docker resources (memory, CPU) settings if the containers are not starting.
- **Port conflicts**: Ensure ports 5000 and 6379 are not in use by other applications. Modify the `docker-compose.yml` file to use different ports if needed.
- **Network issues**: If containers can't communicate, try restarting Docker or your computer. Check network settings in Docker Desktop.
- **Module not found errors**: Run `docker-compose down` and `docker-compose up --build` to rebuild the containers and ensure all dependencies are installed.

## Reasons for Technology Choices

- **Node.js and Express**: Chosen for the ability to quickly build scalable and efficient APIs.
- **React**: Chosen for its flexibility, robustness, and wide adoption in the community.
- **Material-UI and Tailwind CSS**: Chosen to provide a modern and highly customizable user interface.
- **Leaflet**: Chosen for being a lightweight and easy-to-integrate mapping library.
- **Docker**: Chosen to ensure consistent application behavior across different environments.

## TODOs

- **PostgreSQL Integration**: Store food truck data in a relational database for more efficient queries and data persistence.
- **Asynchronous Data Updates via Cron**: Implement a cron job to periodically update the food truck data.
- **Optimized Queries**: Implement caching for frequent queries to improve overall application performance.
- **Authentication and Authorization**: Add user authentication and authorization functionalities.
- **Automated Testing**: Implement unit and integration tests to ensure code quality.

## Contribution

Contributions are welcome! Feel free to open issues and pull requests in the repository.

## License

This project is licensed under the MIT License.

---

You can access the project repository [here](https://github.com/adriano0488/engineering-assessment).

## Screenshots

![Screenshot 1](https://github.com/adriano0488/engineering-assessment/blob/main/screenshoot1.jpeg)
![Screenshot 2](https://github.com/adriano0488/engineering-assessment/blob/main/screenshoot2.jpeg)
![Screenshot 3](https://github.com/adriano0488/engineering-assessment/blob/main/screenshoot3.jpeg)
