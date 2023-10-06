import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;

public class myServer {
    public static void main(String[] args) {
        System.out.println("Starting server...");

        try {
            // Create a server instance
            HttpServer server = HttpServer.create(new InetSocketAddress(8000), 0);

            // Create a context to handle requests
            server.createContext("/", new MyHandler());

            // Set executor (null means default executor)
            server.setExecutor(null);

            // Start the server
            server.start();

            System.out.println("Server started at http://localhost:8000/");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    static class MyHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange t) throws IOException {
            String response = "Hello from myServer!";

            t.sendResponseHeaders(200, response.length());
            OutputStream os = t.getResponseBody();
            os.write(response.getBytes());
            os.close();
        }
    }
}
