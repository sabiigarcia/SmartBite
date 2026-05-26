package com.smartbite.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

/**
 * DAO de Receta.
 * Sigue el mismo patrón que ContactoDAO.java del proyecto jakarta-docker-compose-project.
 */
public class RecetaDAO {

    /** Lista todas las recetas (con límite opcional). */
    public List<Receta> listar(int limit) {
        List<Receta> lista = new ArrayList<>();
        String sql = "SELECT ide_rec, nom_rec, tiempo_rec, dificultad_rec, imagen_rec FROM recetas ORDER BY ide_rec ASC LIMIT ?";

        try (Connection conn = ConexionBD.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, limit);

            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    Receta r = new Receta();
                    r.setIdeRec(rs.getInt("ide_rec"));
                    r.setNomRec(rs.getString("nom_rec"));
                    r.setTiempoRec(rs.getString("tiempo_rec"));
                    r.setDificultadRec(rs.getString("dificultad_rec"));
                    r.setImagenRec(rs.getString("imagen_rec"));
                    lista.add(r);
                }
            }

        } catch (Exception e) {
            throw new RuntimeException("Error al listar recetas", e);
        }

        return lista;
    }
}
