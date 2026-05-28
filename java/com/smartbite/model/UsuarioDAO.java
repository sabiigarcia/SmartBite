package com.smartbite.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

/**
 * DAO de Usuario.
 * Sigue el mismo patrón que ContactoDAO.java del proyecto jakarta-docker-compose-project.
 */
public class UsuarioDAO {

    /** Busca usuario por email (para login). */
    public List<Usuario> buscarPorEmail(String email) {
        List<Usuario> lista = new ArrayList<>();
        String sql = "SELECT ide_usu, nom_usu, ape_usu, email_usu FROM usuarios WHERE email_usu = ?";

        try (Connection conn = ConexionBD.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, email);

            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    Usuario u = new Usuario();
                    u.setIdeUsu(rs.getInt("ide_usu"));
                    u.setNomUsu(rs.getString("nom_usu"));
                    u.setApeUsu(rs.getString("ape_usu"));
                    u.setEmailUsu(rs.getString("email_usu"));
                    lista.add(u);
                }
            }

        } catch (Exception e) {
            throw new RuntimeException("Error al buscar usuario", e);
        }

        return lista;
    }

    /** Obtiene todos los usuarios. */
    public List<Usuario> listarTodos() {
        List<Usuario> lista = new ArrayList<>();
        String sql = "SELECT ide_usu, nom_usu, ape_usu, email_usu FROM usuarios ORDER BY nom_usu ASC";

        try (Connection conn = ConexionBD.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                Usuario u = new Usuario();
                u.setIdeUsu(rs.getInt("ide_usu"));
                u.setNomUsu(rs.getString("nom_usu"));
                u.setApeUsu(rs.getString("ape_usu"));
                u.setEmailUsu(rs.getString("email_usu"));
                lista.add(u);
            }

        } catch (Exception e) {
            throw new RuntimeException("Error al listar usuarios", e);
        }

        return lista;
    }

    /** Inserta un nuevo usuario. */
    public void insertar(Usuario u) {
        String sql = "INSERT INTO usuarios (nom_usu, ape_usu, email_usu, pass_usu) VALUES (?, ?, ?, ?)";

        try (Connection conn = ConexionBD.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, u.getNomUsu());
            ps.setString(2, u.getApeUsu());
            ps.setString(3, u.getEmailUsu());
            ps.setString(4, u.getPassUsu());
            ps.executeUpdate();

        } catch (Exception e) {
            throw new RuntimeException("Error al insertar usuario", e);
        }
    }

    /** Elimina un usuario por ID. */
    public void eliminar(int ideUsu) {
        String sql = "DELETE FROM usuarios WHERE ide_usu = ?";

        try (Connection conn = ConexionBD.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, ideUsu);
            ps.executeUpdate();

        } catch (Exception e) {
            throw new RuntimeException("Error al eliminar usuario", e);
        }
    }
}
