-- Tạo 1 keypair đặt tên promethues
 -- download file promethues.pem về máy
-- Tạo 1 instance prometheus 
    -- port 9093: cho alert
    -- port 9090: cho server
    -- port   22: cho ssh

-----------------------------------------
-- kết nối đến máy chủ prometheus: [Public IPv4 DNS của EC2 Prometheus]
ssh -i prometheus.pem ubuntu@ec2-3-91-74-147.compute-1.amazonaws.com

-- download dịch vụ
wget https://github.com/prometheus/prometheus/releases/download/v2.19.0/prometheus-2.19.0.linux-amd64.tar.gz
tar xvfz prometheus-2.19.0.linux-amd64.tar.gz
cd prometheus-2.19.0.linux-amd64
./prometheus --version

-- cấu hình thông tin cho prometheus
    -- lắng nghe máy chủ nào đó
cd prometheus-2.19.0.linux-amd64
nano prometheus.yml
- job_name: 'node'
  static_configs:
  - targets: ['Public IPv4 DNS của EC2 Backend:9100']

-- khởi chạy máy chủ thôi 
./prometheus --config.file=./prometheus.yml
[Public IPv4 address:9090]


-- setting alert cho máy chủ prometheus:9093
cd prometheus-2.19.0.linux-amd64
nano rule.yml



          severity: 'critical'

          
http://34.207.240.68:9090/graph

---- ssh to EC2 prometheus: [Public IPv4 DNS của EC2 Backend]
wget https://github.com/prometheus/node_exporter/releases/download/v1.0.1/node_exporter-1.0.1.linux-amd64.tar.gz
tar xvfz node_exporter-1.0.1.linux-amd64.tar.gz
cd node_exporter-1.0.1.linux-amd64
./node_exporter

------
node_memory_MemFree_bytes


---- ssh to EC2 prometheus: [Public IPv4 DNS của EC2 Backend]
wget https://github.com/prometheus/alertmanager/releases/download/v0.21.0/alertmanager-0.21.0.linux-amd64.tar.gz
tar xvfz alertmanager-0.21.0.linux-amd64.tar.gz
cd alertmanager-0.21.0.linux-amd64
./alertmanager --config.file=alertmanager.yml

------