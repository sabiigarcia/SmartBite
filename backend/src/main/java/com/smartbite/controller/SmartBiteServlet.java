package com.smartbite.controller;

import com.smartbite.model.*;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

/**
 * Servlet REST de SmartBite.
 * Adaptado de BuscarContactosServlet.java del proyecto jakarta-docker-compose-project.
 *
 * Endpoints:
 *   GET  /api/usuarios?email=...     → login / verificar email
 *   GET  /api/recetas?_limit=4       → listado de recetas
 *   GET  /api/ingredientes?_limit=7  → ingredientes detectados
 *   POST /api/usuarios               → registrar usuario (body JSON)
 *   DELETE /api/usuarios?id=...      → eliminar usuario (admin)
 */
@WebServlet("/api/*")
public class SmartBiteServlet extends HttpServlet {

    private final UsuarioDAO    usuarioDAO    = new UsuarioDAO();
    private final RecetaDAO     recetaDAO     = new RecetaDAO();
    private final IngredienteDAO ingredienteDAO = new IngredienteDAO();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException {
        res.setContentType("application/json;charset=UTF-8");
        // Permitir CORS para el frontend Next.js en desarrollo
        res.setHeader("Access-Control-Allow-Origin", "*");

        String path = req.getPathInfo(); // p.ej. "/usuarios"

        PrintWriter out = res.getWriter();

        try {
            if ("/usuarios".equals(path)) {
                String email = req.getParameter("email");
                if (email != null && !email.isEmpty()) {
                    List<Usuario> usuarios = usuarioDAO.buscarPorEmail(email);
                    out.print(usuariosToJson(usuarios));
                } else {
                    List<Usuario> usuarios = usuarioDAO.listarTodos();
                    out.print(usuariosToJson(usuarios));
                }

            } else if ("/recetas".equals(path)) {
                int limit = parseLimit(req.getParameter("_limit"), 4);
                List<Receta> recetas = recetaDAO.listar(limit);
                out.print(recetasToJson(recetas));

            } else if ("/ingredientes".equals(path)) {
                int limit = parseLimit(req.getParameter("_limit"), 7);
                List<Ingrediente> ingredientes = ingredienteDAO.listar(limit);
                out.print(ingredientesToJson(ingredientes));

            } else {
                res.setStatus(HttpServletResponse.SC_NOT_FOUND);
                out.print("{\"error\":\"Endpoint no encontrado\"}");
            }

        } catch (Exception e) {
            res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"error\":\"" + e.getMessage().replace("\"", "'") + "\"}");
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
        res.setContentType("application/json;charset=UTF-8");
        res.setHeader("Access-Control-Allow-Origin", "*");

        String path = req.getPathInfo();
        PrintWriter out = res.getWriter();

        if ("/usuarios".equals(path)) {
            try {
                StringBuilder body = new StringBuilder();
                req.getReader().lines().forEach(body::append);
                String json = body.toString();

                // Parseo manual simple del JSON de registro
                String nom  = extraerValor(json, "name");
                String ape  = extraerValor(json, "lastName");
                String email = extraerValor(json, "email");
                String pass  = extraerValor(json, "password");

                Usuario u = new Usuario();
                u.setNomUsu(nom);
                u.setApeUsu(ape);
                u.setEmailUsu(email);
                u.setPassUsu(pass);

                usuarioDAO.insertar(u);
                res.setStatus(HttpServletResponse.SC_CREATED);
                out.print("{\"ok\":true,\"mensaje\":\"Usuario registrado correctamente\"}");

            } catch (Exception e) {
                res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                out.print("{\"error\":\"" + e.getMessage().replace("\"", "'") + "\"}");
            }
        } else {
            res.setStatus(HttpServletResponse.SC_NOT_FOUND);
            out.print("{\"error\":\"Endpoint no encontrado\"}");
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse res) throws IOException {
        res.setContentType("application/json;charset=UTF-8");
        res.setHeader("Access-Control-Allow-Origin", "*");

        String path = req.getPathInfo();
        PrintWriter out = res.getWriter();

        if ("/usuarios".equals(path)) {
            try {
                String idStr = req.getParameter("id");
                int id = Integer.parseInt(idStr);
                usuarioDAO.eliminar(id);
                out.print("{\"ok\":true,\"mensaje\":\"Usuario eliminado\"}");
            } catch (Exception e) {
                res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                out.print("{\"error\":\"" + e.getMessage().replace("\"", "'") + "\"}");
            }
        } else {
            res.setStatus(HttpServletResponse.SC_NOT_FOUND);
            out.print("{\"error\":\"Endpoint no encontrado\"}");
        }
    }

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        res.setStatus(HttpServletResponse.SC_OK);
    }

    // ---- Helpers JSON manuales (sin dependencia extra) ----

    private String usuariosToJson(List<Usuario> lista) {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < lista.size(); i++) {
            Usuario u = lista.get(i);
            sb.append("{")
              .append("\"id\":").append(u.getIdeUsu()).append(",")
              .append("\"name\":\"").append(esc(u.getNomUsu())).append("\",")
              .append("\"lastName\":\"").append(esc(u.getApeUsu())).append("\",")
              .append("\"email\":\"").append(esc(u.getEmailUsu())).append("\"")
              .append("}");
            if (i < lista.size() - 1) sb.append(",");
        }
        sb.append("]");
        return sb.toString();
    }

    private String recetasToJson(List<Receta> lista) {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < lista.size(); i++) {
            Receta r = lista.get(i);
            sb.append("{")
              .append("\"id\":").append(r.getIdeRec()).append(",")
              .append("\"title\":\"").append(esc(r.getNomRec())).append("\",")
              .append("\"time\":\"").append(esc(r.getTiempoRec())).append("\",")
              .append("\"difficulty\":\"").append(esc(r.getDificultadRec())).append("\",")
              .append("\"image\":\"").append(esc(r.getImagenRec() != null ? r.getImagenRec() : "")).append("\"")
              .append("}");
            if (i < lista.size() - 1) sb.append(",");
        }
        sb.append("]");
        return sb.toString();
    }

    private String ingredientesToJson(List<Ingrediente> lista) {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < lista.size(); i++) {
            Ingrediente ig = lista.get(i);
            sb.append("{")
              .append("\"id\":").append(ig.getIdeIng()).append(",")
              .append("\"title\":\"").append(esc(ig.getNomIng())).append("\",")
              .append("\"color\":\"").append(esc(ig.getColorIng())).append("\"")
              .append("}");
            if (i < lista.size() - 1) sb.append(",");
        }
        sb.append("]");
        return sb.toString();
    }

    private int parseLimit(String param, int defaultVal) {
        try { return Integer.parseInt(param); } catch (Exception e) { return defaultVal; }
    }

    private String esc(String s) {
        return s == null ? "" : s.replace("\\", "\\\\").replace("\"", "\\\"");
    }

    private String extraerValor(String json, String clave) {
        String patron = "\"" + clave + "\"";
        int idx = json.indexOf(patron);
        if (idx < 0) return "";
        int colon = json.indexOf(":", idx + patron.length());
        int q1 = json.indexOf("\"", colon + 1);
        int q2 = json.indexOf("\"", q1 + 1);
        return (q1 >= 0 && q2 > q1) ? json.substring(q1 + 1, q2) : "";
    }
}
