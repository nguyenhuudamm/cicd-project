-- key kvdb
FFoeedRMjDDNGPEPsRLXdp
-- set value    [set value for key migration_$\{CIRCLE_WORKFLOW_ID:0:7\}  = 1]
curl https://kvdb.io/30VaycSPEu1ecHAThcgKqynz/migration_$\{CIRCLE_WORKFLOW_ID:0:7\} -d '1'
-- get value    [get value from migration_$\{CIRCLE_WORKFLOW_ID:0:7}  =  1]
curl -- insecure https://kvdb.io/30VaycSPEu1ecHAThcgKqynz/migration_$\{CIRCLE_WORKFLOW_ID:0:7\}

27d776e
curl https://kvdb.io/FFoeedRMjDDNGPEPsRLXdp/migration_test -d '1'


-----------------------------------------
---- ssh to EC2 prometheus: [Public IPv4 DNS của EC2 Prometheus]
ssh -i prometheus.pem ubuntu@ec2-3-91-74-147.compute-1.amazonaws.com
wget https://github.com/prometheus/prometheus/releases/download/v2.19.0/prometheus-2.19.0.linux-amd64.tar.gz
tar xvfz prometheus-2.19.0.linux-amd64.tar.gz
cd prometheus-2.19.0.linux-amd64
./prometheus --version
---- start 
./prometheus --config.file=./prometheus.yml
---- connect to server prometheus [Public IPv4 address]
---- config
cd prometheus-2.19.0.linux-amd64
nano prometheus.yml
- job_name: 'node'
  static_configs:
  - targets: ['Public IPv4 DNS của EC2 Backend:9100']

---- alert
cd prometheus-2.19.0.linux-amd64
nano rule.yml
    groups:
    - name: AllInstances:
      rules:
      - alert: UsingTooMuchMemory
        expr: node_memory_MemFree_bytes < 10000
        for: 1m
        annotations:
          title: 'Instance is almost out of memory'
          description: 'Help me'
        labels:
          severity: 'critical'

          
http://34.207.240.68:9090/graph

---- ssh to EC2 prometheus: [Public IPv4 DNS của EC2 Backend]
wget https://github.com/prometheus/node_exporter/releases/download/v1.0.1/node_exporter-1.0.1.linux-amd64.tar.gz
tar xvfz node_exporter-1.0.1.linux-amd64.tar.gz
cd node_exporter-1.0.1.linux-amd64
./node_exporter

------
node_memory_MemFree_bytes








circleci/node	Dành cho các ứng dụng mạng và phía máy chủ Node.JS.
circleci/postgres	Dành cho các tác vụ yêu cầu chức năng cơ sở dữ liệu PostgreSQL.
circleci/python	Đối với công việc cần chạy Python hoặc pip.
alpine:latest	Một thùng chứa nhẹ cho các công việc đơn giản.
amazon/aws-cli	Đối với các tác vụ yêu cầu AWS CLI và các công cụ liên quan.


checkout	Kiểm tra mã nguồn. Điều này thường gặp ở tất cả các công việc ở CI.
run	Chạy lệnh shell. Có thể đặt tên cho bước hoặc đơn giản là thực thi một tập lệnh.
when	Một bước có điều kiện có các bước riêng được chạy nếu điều kiện đúng.
save_cacheVàrestore_cache	Lưu và khôi phục tập tin hoặc thư mục. Dọn dẹp sau khi kết thúc đường ống.
persist_to_workspaceVàattach_workspace	Giống như bộ đệm, nhưng các tệp sẽ khả dụng trong 15 ngày sau khi phân phối.
add_ssh_keys	Thêm một số khóa ssh bổ sung vào công việc cho một công cụ cần chúng (tức là Ansible).
store_artifacts	Cung cấp một tạo phẩm hoặc tệp để tải xuống thông qua ứng dụng web hoặc API CircleCI.
store_test_results	Lưu trữ kết quả kiểm tra từ người chạy thử để kết quả hiển thị trong ứng dụng web Circle CI trong phần Tóm tắt Kiểm tra.
"Orbs"	Các quả cầu mà chúng ta đã nói đến được sử dụng như các loại bước.



pipeline.id	ID của đường ống hiện đang chạy
pipeline.number	ID số thay thế cho quy trình hiện đang chạy
pipeline.project.git_url	URL của sự kiện git kích hoạt (ví dụ: URL yêu cầu kéo)
pipeline.project.type	Ví dụ: “github”
pipeline.git.branch	Nhánh kích hoạt đường ống

CIRCLE_BRANCH	Tên của nhánh Git hiện đang được xây dựng
CIRCLE_WORKFLOW_ID	Mã định danh duy nhất cho phiên bản quy trình làm việc của công việc hiện tại
CIRCLE_BUILD_NUM	Số lượng bản dựng CircleCI
CIRCLE_PR_NUMBER	Số lượng yêu cầu kéo GitHub hoặc Bitbucket được liên kết
CIRCLE_SHA1	Hàm băm SHA1 của lần xác nhận cuối cùng của bản dựng hiện tại


Bạn có thể sử dụng chúng ở hầu hết mọi nơi trong công việc của mình bằng cú pháp đơn giản:

environment:
    PIPLE_ID:  << pipeline.id >>
echo My pipeline id is << pipeline.id >> and my git branch is << pipeline.git.branch >>