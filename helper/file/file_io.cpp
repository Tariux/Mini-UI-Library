#include <node.h>
#include <v8.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <cstring>

namespace demo {

using v8::Exception;
using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

void WriteFile(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (args.Length() < 2) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong number of arguments").ToLocalChecked()));
    return;
  }

  if (!args[0]->IsString() || !args[1]->IsString()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments").ToLocalChecked()));
    return;
  }

  v8::String::Utf8Value path(isolate, args[0]);
  v8::String::Utf8Value content(isolate, args[1]);

  int fd = open(*path, O_WRONLY | O_CREAT, 0644);
  if (fd < 0) {
    isolate->ThrowException(Exception::Error(
        String::NewFromUtf8(isolate, "Failed to open file").ToLocalChecked()));
    return;
  }

  ssize_t result = write(fd, *content, std::strlen(*content));
  if (result < 0) {
    isolate->ThrowException(Exception::Error(
        String::NewFromUtf8(isolate, "Failed to write to file").ToLocalChecked()));
    close(fd);
    return;
  }

  close(fd);
}

void ReadFile(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (args.Length() < 1) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong number of arguments").ToLocalChecked()));
    return;
  }

  if (!args[0]->IsString()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong arguments").ToLocalChecked()));
    return;
  }

  v8::String::Utf8Value path(isolate, args[0]);

  int fd = open(*path, O_RDONLY);
  if (fd < 0) {
    isolate->ThrowException(Exception::Error(
        String::NewFromUtf8(isolate, "Failed to open file").ToLocalChecked()));
    return;
  }

  struct stat file_stat;
  if (fstat(fd, &file_stat) < 0) {
    isolate->ThrowException(Exception::Error(
        String::NewFromUtf8(isolate, "Failed to get file stats").ToLocalChecked()));
    close(fd);
    return;
  }

  char* buffer = new char[file_stat.st_size];
  ssize_t result = read(fd, buffer, file_stat.st_size);
  if (result < 0) {
    isolate->ThrowException(Exception::Error(
        String::NewFromUtf8(isolate, "Failed to read file").ToLocalChecked()));
    close(fd);
    delete[] buffer;
    return;
  }

  Local<String> content = String::NewFromUtf8(isolate, buffer, v8::NewStringType::kNormal, file_stat.st_size).ToLocalChecked();
  args.GetReturnValue().Set(content);

  close(fd);
  delete[] buffer;
}

void Initialize(Local<Object> exports) {
  NODE_SET_METHOD(exports, "writeFile", WriteFile);
  NODE_SET_METHOD(exports, "readFile", ReadFile);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)

}  // namespace demo
