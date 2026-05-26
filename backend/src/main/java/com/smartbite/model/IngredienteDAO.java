package com.smartbite.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

/**
 * DAO de Ingrediente.
 * Sigue el mismo patrón que ContactoDAO.java del proyecto jakarta-docker-compose-project.
 */
public class IngredienteDAO {

    /** Lista todos los ingredientes (con límite opcional). */
    public List<Ingrediente> listar(int limit) {
        List<Ingrediente> lista = new ArrayList<>();
        String sql = "SELECT ide_ing, nom_ing, color_ing FROM ingredientes ORDER BY ide_ing ASC LIMIT ?";

        try (Connection conn = ConexionBD.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, limit);

            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    Ingrediente i = new Ingrediente();
                    i.setIdeIng(rs.getInt("ide_ing"));
                    i.setNomIng(rs.getString("nom_ing"));
                    i.setColorIng(rs.getString("color_ing"));
                    lista.add(i);
                }
            }

        } catch (Exception e) {
            throw new RuntimeException("Error al listar ingredientes", e);
        }

        return lista;
    }
}
