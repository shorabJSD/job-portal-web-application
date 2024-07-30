// cookie parser;

### ✅Berife overview of Middlewares. which are included in current project.

✅✅Cookie-Parser

 **Definition** : `cookie-parser` is a middleware for Express.js that parses cookies sent by the client in the HTTP request header. It makes the cookies available in `req.cookies` for easy access.

 **Usage** : It is often used to handle session data, user preferences, and tacking other user information stored in cookies.

✅✅ CORS = Crose-Origin Resource Sharing.

* **Definition** : A security feature to control resource sharing between different origins.
* **Origin** : Defined by protocol, domain, and port (e.g., `https://example.com`).
* **Purpose** : Prevents unauthorized access to resources from different origins.
* **Preflight Request** : A preliminary request (HTTP OPTIONS) to check permissions.
* **Key Headers** :
* `Access-Control-Allow-Origin`: Specifies allowed origins (`*` for all).
* `Access-Control-Allow-Methods`: Specifies allowed HTTP methods (e.g., GET, POST).
* `Access-Control-Allow-Headers`: Specifies allowed headers in the request.
* `Access-Control-Allow-Credentials`: Indicates if credentials (cookies) are allowed.
* **Implementation in Express** :
* Use `cors` middleware: `app.use(cors());` for all origins or `app.use(cors({ origin: 'https://example.com' }));` for a specific origin.
* **Use Case** : Enables secure interactions with external APIs and resources.
