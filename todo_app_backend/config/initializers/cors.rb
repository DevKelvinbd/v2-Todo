# config/initializers/cors.rb
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://127.0.0.1:5173', 'http://localhost:5173'
    # Se quiser liberar de qualquer origem (não recomendado em produção), use: 
    # origins '*'

    resource '*',
      headers: :any,
      methods: [:get, :post, :patch, :put, :delete, :options, :head]
  end
end