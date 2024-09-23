package controller;

import dao.UserDao;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Obtener los parámetros del formulario de login
        System.out.println("login");
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        

        // Instanciar el DAO para validar las credenciales
        UserDao userDao = new UserDao();
        boolean usuarioValido = userDao.validarUsuario(email, password);

        // Redirigir según la validación
        if (usuarioValido) {
            response.sendRedirect("/CAC-Movies/pages/gestionUsuarios.html");
        } else {
            response.sendRedirect("index.html");
        }
    }
}
