const pool = require("../config/dbConfig").pool;

exports.findAllPoint = async function (req, res) {
  try {
    const { rows } = await pool.query(
      `SELECT jsonb_build_object(
                'type',     'FeatureCollection',
                'features', jsonb_agg(feature)
            )
            FROM (
                SELECT jsonb_build_object(
                    'type', 'Feature',
                    'geometry',   ST_FlipCoordinates(ST_AsGeoJSON(geom,4326))::json,
                    'properties', to_jsonb(points) - 'geom'
                ) AS feature
            FROM (SELECT * FROM point) points
            ) features;`
    );
    let data = rows[0].jsonb_build_object;
    if (data.features) {
      res.status(200).json(data);
    } else {
      res.status(200).json("Data not available from the database");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findAllPolygon = async function (req, res) {
  try {
    const { rows } = await pool.query(
      `SELECT jsonb_build_object(
                'type',     'FeatureCollection',
                'features', jsonb_agg(feature)
            )
            FROM (
                SELECT jsonb_build_object(
                    'type', 'Feature',
                    'geometry',    ST_FlipCoordinates(ST_AsGeoJSON(geom,4326))::json,
                    'properties', to_jsonb(polygons) - 'geom'
                ) AS feature
            FROM (SELECT * FROM polygon) polygons
            ) features;`
    );
    let data = rows[0].jsonb_build_object;
    if (data.features) {
      res.status(200).json(data);
    } else {
      res.status(200).json({ message: "Data not available from the database" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findAllLine = async function (req, res) {
  try {
    const { rows } = await pool.query(
      `SELECT jsonb_build_object(
                    'type',     'FeatureCollection',
                    'features', jsonb_agg(feature)
                )
                FROM (
                    SELECT jsonb_build_object(
                        'type', 'Feature',
                        'geometry',    ST_FlipCoordinates(ST_AsGeoJSON(geom,4326))::json,
                        'properties', to_jsonb(lines) - 'geom'
                    ) AS feature
                FROM (SELECT * FROM line) lines
                ) features;`
    );
    let data = rows[0].jsonb_build_object;
    if (data.features) {
      res.status(200).json(data);
    } else {
      res.status(200).json({ message: "Data not available from the database" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async function (req, res) {
  const type = req.body.geometry.type;
  let sql;
  if (type == "Point") {
    sql =
      `INSERT INTO point (nama_point, geom)
            VALUES ( '` +
      req.body.properties.nama_point +
      `', ST_GeomFromGeoJSON( '` +
      JSON.stringify(req.body.geometry) +
      `'))`;
  } else if (type == "LineString") {
    sql =
      `INSERT INTO line (nama_line, deskripsi, geom)
            VALUES ( '` +
      req.body.properties.nama_line +
      `','` +
      req.body.properties.deskripsi +
      `', ST_GeomFromGeoJSON( '` +
      JSON.stringify(req.body.geometry) +
      `'))`;
  } else if (type == "Polygon") {
    sql =
      `INSERT INTO polygon (nama_polygon, deskripsi, geom)
            VALUES ( '` +
      req.body.properties.nama_polygon +
      `','` +
      req.body.properties.deskripsi +
      `', ST_GeomFromGeoJSON( '` +
      JSON.stringify(req.body.geometry) +
      `'))`;
  }
  try {
    const data = await pool.query(sql);
    res.status(200).json({ data: req.body, message: "Successfully created!" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.update = async function (req, res) {
  const type = req.body.geometry.type;
  let sql;
  if (type == "Point") {
    sql =
      `UPDATE point
            SET nama_point = '` +
      req.body.properties.nama_point +
      `', geom = ST_GeomFromGeoJSON( '` +
      JSON.stringify(req.body.geometry) +
      `')
            WHERE id = ` +
      req.params.id;
  } else if (type == "LineString") {
    sql =
      `UPDATE line
            SET nama_line = '` +
      req.body.properties.nama_line +
      `', deskripsi = '` +
      req.body.properties.deskripsi +
      `', geom = ST_GeomFromGeoJSON( '` +
      JSON.stringify(req.body.geometry) +
      `')
            WHERE id = ` +
      req.params.id;
  } else if (type == "Polygon") {
    sql =
      `UPDATE polygon
            SET nama_polygon = '` +
      req.body.properties.nama_polygon +
      `', deskripsi = '` +
      req.body.properties.deskripsi +
      `', geom = ST_GeomFromGeoJSON( '` +
      JSON.stringify(req.body.geometry) +
      `')
            WHERE id = ` +
      req.params.id;
  }

  try {
    const data = await pool.query(sql);
    if (!data.rowCount) {
      res.status(400).json({ message: "Data doesn't exist!" });
    } else {
      res
        .status(200)
        .json({ data: req.body, message: "Successfully updated!" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deletePoint = async function (req, res) {
  try {
    const datum = await pool.query(
      `DELETE FROM point WHERE id = ` + req.params.id
    );
    if (!datum.rowCount) {
      res.status(400).json({ message: "Data doesn't exist!" });
    } else {
      res.status(200).json({ message: "Successfully deleted!" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteLine = async function (req, res) {
  try {
    const datum = await pool.query(
      `DELETE FROM line WHERE id = ` + req.params.id
    );
    if (!datum.rowCount) {
      res.status(400).json({ message: "Data doesn't exist!" });
    } else {
      res.status(200).json({ message: "Successfully deleted!" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deletePolygon = async function (req, res) {
  try {
    const datum = await pool.query(
      `DELETE FROM polygon WHERE id = ` + req.params.id
    );
    if (!datum.rowCount) {
      res.status(400).json({ message: "Data doesn't exist!" });
    } else {
      res.status(200).json({ message: "Successfully deleted!" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
